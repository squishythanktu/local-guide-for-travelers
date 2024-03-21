const path = {
  home: '/',
  login: '/login',
  register: '/register',
  account: '/account',
  profile: '/account/profile',
  password: '/account/password',
  management: '/management',
  tours: '/management/my-tours',
  schedule: '/management/schedules',
  request: '/management/requests',
  admin: '/admin',
  salesReport: '/admin/sales-report',
  salesReportOfTour: '/admin/sales-report/tour',
  salesReportOfGuide: '/admin/sales-report/guide',
  reset: '/reset',
  searchTour: 'tours/search',
  searchGuide: 'guides/search',
  tourDetail: 'tours/:id',
  guideProfile: '/guides/:id',
  cart: '/cart',
  checkout: '/cart/checkout',
  bookings: '/bookings',
  bookingSuccess: '/booking-success/:id',
  bookingFail: '/booking-fail',
  requestTour: '/request-add-tour'
}

export default path
