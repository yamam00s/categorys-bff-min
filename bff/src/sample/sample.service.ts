import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
  getSample() {
    return {
      name: 'sample',
    };
  }
}
