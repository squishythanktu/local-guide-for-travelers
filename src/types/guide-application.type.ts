import { GuideApplicationStatus } from 'src/enums/guide-application-status'

export type GuideApplicationData = { status: GuideApplicationStatus; reasonDeny?: string }
