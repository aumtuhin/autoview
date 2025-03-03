import { TestBed } from '@angular/core/testing';
import { VehicleDialogService } from './vehicle-dialog.service';

describe('VehicleDialogService', () => {
  let service: VehicleDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with dialogState as false', (done) => {
    service.dialogState$.subscribe((state) => {
      expect(state).toBeFalse();
      done(); // Ensures async observable completes
    });
  });

  it('should set dialogState to true when openDialog() is called', (done) => {
    service.openDialog(); // Open dialog

    service.dialogState$.subscribe((state) => {
      expect(state).toBeTrue();
      done();
    });
  });

  it('should set dialogState to false when closeDialog() is called', (done) => {
    service.openDialog(); // Open first
    service.closeDialog(); // Then close

    service.dialogState$.subscribe((state) => {
      expect(state).toBeFalse();
      done();
    });
  });
});
