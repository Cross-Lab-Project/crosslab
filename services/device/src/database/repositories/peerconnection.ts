import {Peerconnection} from "../../generated/types";
import {peerconnectionUrlFromId} from "../../methods/urlFromId";
import {PeerconnectionModel} from "../model";
import {AbstractRepository, InvalidValueError} from "@crosslab/service-common";
import {EntityManager} from "typeorm";

export class PeerconnectionRepository extends AbstractRepository<
  PeerconnectionModel,
  Peerconnection<"request">,
  Peerconnection<"response">
> {
  protected dependencies: Record<string, never> = {};

  constructor() {
    super("Peerconnection");
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(PeerconnectionModel);
  }

  async create(data?: Peerconnection<"request">): Promise<PeerconnectionModel> {
    const model = await super.create(data);
    model.status = "new";

    return model;
  }

  async write(
    model: PeerconnectionModel,
    data: Peerconnection<"request">,
  ): Promise<void> {
    if (data.type) model.type = data.type;

    if (data.devices && data.devices.length !== 2) {
      throw new InvalidValueError(
        `Peerconnections need exactly 2 devices, received ${data.devices?.length}`,
        400,
      );
    }

    if (data.devices) {
      const deviceA = data.devices[0];
      const deviceB = data.devices[1];

      if (!deviceA.url || !deviceB.url) {
        throw new InvalidValueError(
          "One of the provided devices does not have a url",
          400,
        );
      }

      model.deviceA = {...deviceA, status: "new"};
      model.deviceB = {...deviceB, status: "new"};
    }
  }

  async format(model: PeerconnectionModel): Promise<Peerconnection<"response">> {
    return {
      url: peerconnectionUrlFromId(model.uuid),
      type: model.type,
      status: model.status,
      devices: [{...model.deviceA}, {...model.deviceB}],
    };
  }

  formatOverview(model: PeerconnectionModel): Peerconnection<"response"> {
    return {
      url: peerconnectionUrlFromId(model.uuid),
      type: model.type,
      status: model.status,
      devices: [{url: model.deviceA.url}, {url: model.deviceB.url}],
    };
  }
}
