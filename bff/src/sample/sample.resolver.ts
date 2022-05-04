import { Resolver, Query } from "@nestjs/graphql";
import { IQuery } from "src/graphql";

import { SampleService } from "./sample.service";

@Resolver()
export class SampleResolver implements Pick<IQuery, "sample"> {
  constructor(private readonly service: SampleService) {}

  @Query()
  sample() {
    return this.service.getSample();
  }
}
