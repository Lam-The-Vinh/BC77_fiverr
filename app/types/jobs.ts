interface JobRental {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

interface JobFormValues {
  jobId: string;
  renterId: string;
  renterDate: string;
  completed: boolean;
}

interface JobFormProps {
  initialValues: JobFormValues;
  onSubmit: (values: JobFormValues) => void;
  onClose: () => void;
}

interface JobRentalState {
  data: JobRental[];
  loading: boolean;
  error: string | null;
}
