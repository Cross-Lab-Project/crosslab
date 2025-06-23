import { terminal } from "terminal-kit";
import { Job, Project } from "./projects-loader";

type Node = string;
type Edge = {
  from: Node;
  to: Node;
};
type Path = {
  from: Node;
  to: Node;
  edges: Edge[];
};

export class DependencyGraph {
  private roots: Node[] = [];
  private leaves: Node[] = [];
  private _nodes: Node[] = [];
  private edges: Edge[] = [];
  private paths: Path[] = [];

  public get nodes() {
    return this._nodes;
  }

  public addNode(node: Node): void {
    if (this._nodes.find((n) => n === node)) return;
    this._nodes.push(node);
    this.roots.push(node);
    this.leaves.push(node);
  }

  public addEdge(from: Node, to: Node): void {
    if (!this._nodes.find((node) => node === from))
      throw new Error(`Could not find node "${from}"!`);
    if (!this._nodes.find((node) => node === to))
      throw new Error(`Could not find node "${to}"!`);
    if (from === to)
      throw new Error("The dependency graph must not contain any loops!");

    if (this.edges.find((e) => e.from === from && e.to === to)) return;

    const edge: Edge = { from, to };
    this.edges.push(edge);
    this.paths.push({ from, to, edges: [edge] });

    this.roots = this.roots.filter((root) => edge.to !== root);
    this.leaves = this.leaves.filter((leave) => edge.from !== leave);

    for (const path of this.paths) {
      if (path.to === from && path.from === to) {
        console.error("Found a loop:", [...path.edges, edge]);
        throw new Error("The dependency graph must not contain any loops!");
      }
      if (path.to === from)
        this.paths.push({ from: path.from, to, edges: [...path.edges, edge] });
    }
  }

  public invert(): DependencyGraph {
    const invertedDependencyGraph = new DependencyGraph();

    for (const node of this.nodes) {
      invertedDependencyGraph.addNode(node);
    }

    for (const edge of this.edges) {
      invertedDependencyGraph.addEdge(edge.to, edge.from);
    }

    return invertedDependencyGraph;
  }

  public getDependents(node: Node): Node[] {
    return this.edges
      .filter((edge) => edge.to === node)
      .map((edge) => edge.from);
  }

  public getDependencies(node: Node): Node[] {
    return this.edges
      .filter((edge) => edge.from === node)
      .map((edge) => edge.to);
  }

  public traverse(
    f: (node: Node, abort: boolean) => Promise<boolean> | boolean
  ) {
    const running: Promise<void>[] = [];

    return new Promise<void>((resolve) => {
      const started: Set<string> = new Set();
      const finished: Set<string> = new Set();
      const failed: Set<string> = new Set();

      const tf = async (node: Node, abort: boolean) => {
        started.add(node);
        const success = await f(node, abort);
        finished.add(node);
        if (!success || abort) failed.add(node);

        if (finished.size === this.nodes.length) {
          resolve();
          return;
        }

        const dependencies = this.getDependencies(node);
        for (const dependency of dependencies) {
          const dependents = this.getDependents(dependency);

          if (
            dependents.filter((dependent) => failed.has(dependent)).length >
              0 &&
            !started.has(dependency)
          ) {
            running.push(tf(dependency, true));
            continue;
          }

          const dependentsLeft = dependents.filter(
            (dependent) => !finished.has(dependent)
          ).length;
          if (!dependentsLeft && !started.has(dependency))
            running.push(tf(dependency, false));
        }
      };

      for (const root of this.roots) {
        running.push(tf(root, false));
      }
    });
  }
}

function addDependency(
  from: Job,
  to: Job,
  projects: Project[],
  dependencyGraph: DependencyGraph
): void {
  dependencyGraph.addNode(to.title);
  dependencyGraph.addEdge(from.title, to.title);

  for (const dependency of to.dependencies ?? []) {
    const [projectName, script] = dependency.split(":");
    const project = projects.find((p) => p.name === projectName);
    const dependencyJob = project?.jobs.find((j) => j.script === script);
    if (!dependencyJob) throw new Error(`Could not find job "${dependency}"`);

    addDependency(to, dependencyJob, projects, dependencyGraph);
  }
}

export function buildDependencyGraph(
  jobs: Job[],
  projects: Project[]
): DependencyGraph {
  const dependencyGraph = new DependencyGraph();

  for (const job of jobs) {
    dependencyGraph.addNode(job.title);

    for (const dependency of job.dependencies ?? []) {
      const [projectName, script] = dependency.split(":");
      const project = projects.find((p) => p.name === projectName);
      const dependencyJob = project?.jobs.find((j) => j.script === script);
      if (!dependencyJob) throw new Error(`Could not find job "${dependency}"`);

      addDependency(job, dependencyJob, projects, dependencyGraph);
    }
  }

  return dependencyGraph;
}
