import { TestBed, inject } from '@angular/core/testing';

import { UploadImagesService } from './upload-images.service';

describe('UploadImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImagesService]
    });
  });

  it('should be created', inject([UploadImagesService], (service: UploadImagesService) => {
    expect(service).toBeTruthy();
  }));
});
