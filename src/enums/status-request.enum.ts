export enum StatusRequestForGuide {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  DENIED = 'Denied',
  DONE = 'Done'
}

export enum StatusRequestForTraveler {
  CANCELED = 'Canceled'
}

Object.assign(StatusRequestForTraveler, StatusRequestForGuide)
