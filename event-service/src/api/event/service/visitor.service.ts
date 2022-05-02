import { Inject, Injectable } from '@nestjs/common';
import { VisitorRepository } from '../repository/vistior.repository';

@Injectable()
export class VisitorService {
  constructor(private repository: VisitorRepository) {}
}
