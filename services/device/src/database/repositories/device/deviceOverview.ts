import {DeviceOverview, DeviceOverviewUpdate} from "../../../generated/types";
import {deviceUrlFromId} from "../../../methods/urlFromId";
import {DeviceOverviewModel} from "../../model";
import {AbstractRepository} from "@crosslab/service-common";
import {EntityManager} from "typeorm";

export class DeviceOverviewRepository extends AbstractRepository<
  DeviceOverviewModel,
  DeviceOverview<"request">,
  DeviceOverview<"response">
> {
  protected dependencies: Record<string, never> = {};

  constructor() {
    super("Device Overview");
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(DeviceOverviewModel);
  }

  async write(
    model: DeviceOverviewModel,
    data: DeviceOverviewUpdate<"request">,
  ): Promise<void> {
    if (data.name !== undefined) model.name = data.name;
    if (data.description !== undefined) model.description = data.description;
    if (data.isPublic !== undefined) model.isPublic = data.isPublic;
  }

  async format(model: DeviceOverviewModel): Promise<DeviceOverview<"response">> {
    return {
      url: deviceUrlFromId(model.uuid),
      type: model.type,
      name: model.name,
      description: model.description ?? undefined,
      owner: model.owner,
      isPublic: model.isPublic,
    };
  }
}
