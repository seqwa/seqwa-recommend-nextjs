import { useState } from 'react';
import { Tab, RadioGroup } from '@headlessui/react';
import Searching from './Searching';
import Help from './Help';

export default function RecommendBox() {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recommendByIdResults, setRecommendByIdResults] = useState([]);
  const [recommendByContextResults, setRecommendByContextResults] = useState(
    []
  );
  const [searching, setSearching] = useState(false);

  const tabs = ['Find Similar Items', 'Contextual Search'];

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const autocomplete = async (q) => {
    setQuery(q);
    setSearching(true);
    setSearchResults(null);
    setRecommendByIdResults(null);
    setSearchResults(
      await (await fetch('/api/autocomplete?query=' + q)).json()
    );
    setSearching(false);
  };

  const recommendById = async (item) => {
    setSearching(true);
    setRecommendByIdResults(
      await (await fetch('/api/recommend?recordId=' + item.recordId)).json()
    );
    setSearching(false);
  };

  const recommendByContext = async () => {
    setSearching(true);
    setRecommendByContextResults(
      await (await fetch('/api/recommend?context=' + context)).json()
    );
    setSearching(false);
  };

  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="max-w-xl lg:max-w-5xl mx-auto px-4 py-[5vh]">
      <h1 className="text-5xl text-indigo-50 text-center mb-6">Recommend</h1>
      <Help />
      <h2 className="text-white font-semibold text-center my-5 underline underline-offset-2">
        <a
          className="flex space-x-1 items-center justify-center"
          href="https://www.seqwa.com"
          rel="noreferrer"
          target="_blank"
        >
          <span>Seqwa | AI-Powered Semantic Search</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 lg:h-6 lg:w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.2716 7.25C11.2716 6.83579 11.6073 6.5 12.0216 6.5H16.75C17.1642 6.5 17.5 6.83579 17.5 7.25V11.9785C17.5 12.3927 17.1642 12.7285 16.75 12.7285C16.3358 12.7285 16 12.3927 16 11.9785V9.06066L10.7803 14.2803C10.4874 14.5732 10.0126 14.5732 9.71967 14.2803C9.42678 13.9874 9.42678 13.5126 9.71967 13.2197L14.9393 8H12.0216C11.6073 8 11.2716 7.66421 11.2716 7.25Z"></path>
            <path d="M6.15675 5.25C6.57853 3.94437 7.80398 3 9.25 3H17.75C19.5449 3 21 4.45507 21 6.25V14.8382C21 16.1902 20.1745 17.3494 19 17.8392V17.9751C19 19.0247 18.4705 19.82 17.6913 20.3191C16.9414 20.7995 15.9737 21.0045 14.9977 20.9999L14.9963 20.9999L10.9191 20.9952L7 20.9951C5.84332 20.9951 4.83555 20.6327 4.11066 19.9496C3.38287 19.2639 3 18.3103 3 17.25V8.5C3 7.63484 3.21573 6.81725 3.73399 6.20358C4.26793 5.57135 5.04354 5.25 5.95588 5.25H6.15675ZM6 6.75H5.95588C5.41235 6.75 5.08501 6.92865 4.87998 7.17142C4.65927 7.43275 4.5 7.86516 4.5 8.5V17.25C4.5 17.9397 4.74213 18.4837 5.13934 18.8579C5.53944 19.2349 6.15669 19.4951 7 19.4951L10.9191 19.4952L15.0009 19.4999L15.0037 19.4999C15.7919 19.5038 16.4486 19.3338 16.8822 19.0561C17.254 18.8179 17.4641 18.5061 17.4958 18.0882H9.25C7.45508 18.0882 6 16.6332 6 14.8382V6.75ZM9.25 4.5C8.2835 4.5 7.5 5.2835 7.5 6.25V14.8382C7.5 15.8047 8.2835 16.5882 9.25 16.5882H17.75C18.7165 16.5882 19.5 15.8047 19.5 14.8382V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H9.25Z"></path>
          </svg>
        </a>
      </h2>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mt-4">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-5">
          <Tab.Panel>
            <div className="relative mt-1">
              <div className="flex items-center space-x-1.5">
                <input
                  className="w-full border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                  defaultValue={query}
                  placeholder="search here..."
                  onChange={(event) => autocomplete(event.target.value)}
                />
                {/* <button
                                    className="px-3 py-1 rounded bg-indigo-50 text-indigo-800 shadow"
                                    onClick={() => search()}
                                >
                                    Search
                                </button> */}
              </div>
              <div className="grid grid-cols-2 gap-x-5 py-4">
                {searchResults &&
                  searchResults.records &&
                  searchResults.records.length > 0 && (
                    <>
                      <h2 className="text-xl text-white">Records</h2>
                      <h2 className="text-xl text-white">Similar Items</h2>
                    </>
                  )}
                {searchResults &&
                searchResults.records &&
                searchResults.records.length === 0 &&
                query !== '' ? (
                  <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                    <div className="relative rounded-lg grid gap-8 bg-white p-7 lg:grid-cols-2">
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    </div>
                  </div>
                ) : (
                  searchResults &&
                  searchResults.records && (
                    <div className="w-full pt-2 pb-16">
                      <div className="w-full">
                        <RadioGroup value={selected} onChange={setSelected}>
                          <div className="space-y-2">
                            {searchResults.records.map((item, index) => (
                              <RadioGroup.Option
                                key={index}
                                value={item}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                      : ''
                                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div
                                      className="flex items-center justify-between w-full"
                                      onClick={() => recommendById(item)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-slate-700 text-xs sm:h-12 sm:w-12">
                                          <img
                                            src={item.image}
                                            alt={'Not found'}
                                          />
                                        </div>
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              checked
                                                ? 'text-white'
                                                : 'text-gray-900'
                                            }`}
                                          >
                                            {item.title}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className={`inline ${
                                              checked
                                                ? 'text-sky-100'
                                                : 'text-gray-500'
                                            }`}
                                          >
                                            <span>{item.price}</span>
                                          </RadioGroup.Description>
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <CheckIcon className="w-6 h-6" />
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )
                )}

                {searching ? (
                  <Searching />
                ) : recommendByIdResults &&
                  recommendByIdResults.recommendations &&
                  recommendByIdResults.recommendations.length === 0 ? (
                  <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                    <div className="relative rounded-lg grid gap-8 bg-white p-7 ">
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    </div>
                  </div>
                ) : (
                  recommendByIdResults &&
                  recommendByIdResults.recommendations && (
                    <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                      <div className="relative rounded-lg grid gap-8 bg-white p-7">
                        {recommendByIdResults.recommendations.map(
                          (item, index) => (
                            <a
                              key={index}
                              href={item.link}
                              rel="noreferrer"
                              target="_blank"
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                            >
                              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-slate-700 text-xs sm:h-12 sm:w-12">
                                <img src={item.image} alt={'Not found'} />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.price}
                                </p>
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="relative mt-1">
              <div className="mt-2 flex items-center space-x-1.5">
                <input
                  className="w-full border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                  defaultValue={context}
                  onChange={(event) => setContext(event.target.value)}
                />
                <button
                  className="px-3 py-1 rounded bg-indigo-50 text-indigo-800 shadow"
                  onClick={() => recommendByContext()}
                >
                  Search
                </button>
              </div>
              {searching && <Searching />}

              {recommendByContextResults &&
              recommendByContextResults.recommendations &&
              recommendByContextResults.recommendations.length === 0 ? (
                <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                  <div className="relative rounded-lg grid gap-8 bg-white p-7 lg:grid-cols-2">
                    <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  </div>
                </div>
              ) : (
                recommendByContextResults &&
                recommendByContextResults.recommendations && (
                  <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                    <div className="relative rounded-lg grid gap-8 bg-white p-7 lg:grid-cols-2">
                      {recommendByContextResults.recommendations.map(
                        (item, index) => (
                          <a
                            key={index}
                            href={item.link}
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                          >
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-black text-xs sm:h-12 sm:w-12">
                              <img src={item.image} alt={'Not found'} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.price}
                              </p>
                            </div>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
