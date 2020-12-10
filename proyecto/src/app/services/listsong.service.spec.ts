import { TestBed } from '@angular/core/testing';

import { ListsongService } from './listsong.service';

describe('ListsongService', () => {
  let service: ListsongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
