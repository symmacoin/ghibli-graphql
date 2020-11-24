import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.model';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async all(): Promise<Person[]> {
    return this.personRepository.find({
      relations: ['films', 'pilotOf', 'species', 'locations'],
    });
  }

  async find(id: string): Promise<Person> {
    return this.personRepository.findOne(id, {
      relations: ['films', 'pilotOf', 'species', 'locations'],
    });
  }

  async save(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }
}
