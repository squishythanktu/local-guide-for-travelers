import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AboutActivity from '../../components/AboutActivity'
import BookingAssistant from '../../components/BookingAssistant'
import Experience from '../../components/Experience'
import SimpleSlider from '../../components/SimpleSlider'
import TourHeader from '../../components/TourHeader'

const itemsData = [
  'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  'https://images.unsplash.com/photo-1589118949245-7d38baf380d6'
]

const activityKeyDetail = [
  {
    icon: <CurrencyExchangeOutlinedIcon />,
    title: 'Free cancellation',
    content: 'Cancel up to 24 hours in advance for a full refund'
  },
  {
    icon: <GroupsOutlinedIcon />,
    title: 'Small group',
    content: 'Limited to 9 participants'
  },
  {
    icon: <AlarmOnOutlinedIcon />,
    title: 'Duration',
    content: 'Check availability to see starting times.'
  }
]

const activityExperience = [
  {
    title: 'Highlights',
    content:
      'Explore Hoi An, a UNESCO World Heritage site with beautiful architecture. Visit Tanky Ancient House, Cantonese Assembly Hall, Pottery Museum and more. Learn historical facts and tidbits from a friendly and knowledgeable guide. Book at any time - last-minute bookings are accepted!Choose from multiple start time options, a time that is perfect for you'
  },
  {
    title: 'Full description',
    content:
      "Ever wanted to spontaneously book a tour on the same day you take it? This short walking tour will have you exploring the charming city of Hoi An in just two hours! This is perfect if you only have a couple of hours to spare. You can also choose from multiple start times for a time that suits you. Despite having originated as a trading port, Hoi An has transformed into a UNESCO World Heritage site with its beautiful architecture and charming old-world ambiance. The town 's narrow streets are filled with old-style shophouses, art galleries, and food streets. Get to visit the Tanky Ancient House, the Cantonese Assembly Hall, the iconic Japanese Covered Bridge, the Pottery Museum, and the Silk Village. Go on a guided tour with a friendly and knowledgeable guide who will help you explore this charming town and take you to some of the places you can’t miss out on. Learn about the age-old history of some of the popular landmarks, see the exceptionally well-preserved establishments, and discover the best spot for photos, views, and more."
  },
  {
    title: 'Include',
    content: 'Walking tour. Guide. Refreshment after the tour.'
  },
  {
    title: "Don't include",
    content: 'Hotel pickup and drop-off. Food and drinks. Personal expenses. Hoi An City Center Entrance Ticket'
  },
  {
    title: 'Not suitable for',
    content:
      'People with heart problems. People with respiratory issues. Pregnant women. People with mobility impairments.'
  },
  {
    title: 'Meeting point',
    content:
      'Meet your guide at the Hoi An Cultural Heritage Reservation Management Center. Look for a guide wearing a TripGuru shirt or holding a TripGuru sign.'
  },
  {
    title: 'Important information',
    content:
      'What to bring: Cash, Insect repellent, Sunglasses, Camera. Know before you go: If you are headed to the meeting point, we would like to stress that heavy traffic in the morning is expected, and can vary greatly when compared to the travel time stated in navigation apps (e.g. Google Maps, Waze, etc.). Please make sure to consider leaving with enough time to reach your destination. Please note that the Hoi An Ancient Town Entrance Ticket is not included in this tour. You may purchase them at the ticket counter for around usd6 and is reusable for your next entry in the city. If you do not have one yet, the guide will assist you in securing your ticket.'
  }
]

const categories = ['Water Activity', 'GUIDED TOUR']
const title = 'San Francisco: Big Bus Hop-On Hop-Off Sightseeing Tour'
const rating = 5
const numberOfReviews = 125
const provider = 'Anna Sra'

export default function TourDetail() {
  return (
    <div className='px-4 py-2 text-sm md:mx-auto md:px-8 md:py-3 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-24'>
      <div className='activity__container flex flex-col'>
        <TourHeader
          categories={categories}
          title={title}
          rating={rating}
          numberOfReviews={numberOfReviews}
          provider={provider}
        />
        <div className='activity__photo-gallery pb-2 pt-2'>
          <SimpleSlider itemsData={itemsData} />
        </div>
        <div className='activity__content pt-5'>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 lg:grid-cols-4'>
            <div className='col-span-1 flex flex-col gap-6 md:col-span-2 lg:col-span-3'>
              <div className='overview-activity text-sm md:text-[16px]'>
                Immerse yourself in Hoi An's extraordinary local culture on this trip by night boat. Travel through the
                city, and feel the magical sensation of release your own lantern into the sky as you go.
              </div>
              <div className='about-activity flex flex-col gap-2'></div>
              <AboutActivity activityInfomations={activityKeyDetail} />
              <div className='check-availability'></div>
              <div className='experience flex flex-col gap-2'>
                <Experience experiences={activityExperience} />
              </div>
            </div>
            <div className='col-span-1'>
              <BookingAssistant />
            </div>
          </div>
        </div>
        <div className='activity__recommendation mt-10 flex flex-col gap-4 md:gap-6'>
          <div className='text-[18px] font-semibold md:text-2xl'>You might also like...</div>
          <div className='collection-body grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {/* TODO: Handle tour detail API 
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard /> */}
          </div>
        </div>
        <div className='activity__customer-review'></div>
      </div>
    </div>
  )
}
