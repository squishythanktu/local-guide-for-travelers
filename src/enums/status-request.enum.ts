export enum StatusRequestForGuide {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  DENIED = 'Denied',
  DONE = 'Done'
}

export enum StatusRequestForTraveler {
  CANCELED = 'Canceled',
  DRAFT = 'Draft'
}

Object.assign(StatusRequestForTraveler, StatusRequestForGuide)
