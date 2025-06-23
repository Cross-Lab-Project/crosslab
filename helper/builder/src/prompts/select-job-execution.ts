import inquirer from "inquirer";
import AutocompletePrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

inquirer.registerPrompt("autocomplete", AutocompletePrompt);

export async function selectJobExecutionPrompt(): Promise<
  "clean" | "normal" | "retry"
> {
  const { execution } = await inquirer.prompt({
    type: "autocomplete",
    name: "execution",
    message: "Select how to execute the job:",
    source: (_: unknown, input = "") => searchExecutionName(input),
  } as { name: "execution" });

  return execution;
}

function searchExecutionName(input = "") {
  const executionNames = ["normal", "retry", "clean"];
  const results = fuzzy.filter(input, executionNames).map((el) => el.original);

  return results;
}
