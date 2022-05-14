export interface FeedbacksCreateDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbacksCreateDTO) => Promise<void>;
}
