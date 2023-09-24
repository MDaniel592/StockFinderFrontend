import { Tab } from '@headlessui/react'
import React from 'react'
import ProfileLayout from '../Layouts/ProfileLayout'
import NewAlertForm from './NewAlertForm'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewAlert({ userData, telegram, gpuModels }) {
  if (!userData) return <React.Fragment></React.Fragment>

  const categoryTabs = ['Enlace', 'Producto', 'Modelo']

  return (
    <section>
      <h3 className="text-3xl font-semibold text-center">Nueva alerta</h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <p className="max-w-2xl text-center mx-auto  text-sm lg:text-base font-sans font-semibold">
        Puede crear 3 tipos de alertas diferentes:
      </p>

      <section className="w-full max-w-md px-2 py-4 sm:px-0 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl p-1">
            {Object.keys(categoryTabs).map(index => (
              <Tab
                key={Math.random()}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    selected
                      ? 'bg-blue-500 text-white shadow'
                      : 'text-neutral-200 bg-zinc-700 hover:bg-blue-500/[0.5] hover:text-white'
                  )
                }
              >
                {categoryTabs[index]}
              </Tab>
            ))}
          </Tab.List>

          <ProfileLayout marginTop={0} maxWidth={''}>
            <Tab.Panels>
              {Object.keys(categoryTabs).map(index => (
                <Tab.Panel
                  className={classNames('rounded-xl p-3')}
                  key={Math.random()}
                >
                  <NewAlertForm
                    telegram={telegram}
                    alertType={categoryTabs[index]}
                    gpuModels={gpuModels}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </ProfileLayout>
        </Tab.Group>
      </section>
    </section>
  )
}
