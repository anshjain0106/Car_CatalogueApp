import Image from 'next/image'
import { ShowMore, CarCard, CustomFilter, Hero, SearchBar } from '@/components'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';

export default async function Home({searchParams} : HomeProps) {
//using cars data from api
const allCars = await fetchCars({
  manufacturer: searchParams.manufacturer || '',
  year: searchParams.year || 2023,
  fuel: searchParams.fuel || '',
  limit: searchParams.limit || 10,
  model: searchParams.model || '',
});
//checking whether data is empty or not. conditions are where the variable is empty or allcars.length < 1;
const isDataEmpty = !Array.isArray(allCars) || !allCars || allCars.length < 1;  


  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>
        {!isDataEmpty ?(
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore 
            pageNumber = {(searchParams.limit || 10) / 10}
            isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ):(
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no result</h2>
            <p>{allCars?.message}</p>
          </div>
        )
        }
      </div>
    </main>
  )
}
