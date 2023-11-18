export interface ApiError {
  code: number;
  message: string;
  errors: [
    {
      message: string;
      domain: string;
      reason: string;
    },
  ];
  status: string;
}
