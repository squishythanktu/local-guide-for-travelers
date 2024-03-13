export enum StatusRequestForGuide {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  DENIED = 'Denied',
  DONE = 'Done'
}

export enum StatusRequestForTraveler {
  DELETED = 'Deleted'
}

Object.assign(StatusRequestForTraveler, StatusRequestForGuide)
