import { Tab } from '@headlessui/react';
import React from "react";
import ProfileLayout from "../Layout/ProfileLayout";
import NewAlertForm from './NewAlertForm';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewAlert({ userData, telegram, gpu_models }) {

  if (!userData) return <React.Fragment></React.Fragment>;

  const categoryTabs = ['Enlace', 'Producto', 'Modelo']

  return (
    <section>
      <h3 className="text-3xl font-semibold text-center">Nueva alerta</h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <section className="w-full max-w-md px-2 py-8 sm:px-0 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl p-1">
            {Object.keys(categoryTabs).map((index) => (
              <Tab className={({ selected }) =>
                classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
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
              {Object.keys(categoryTabs).map((index) => (
                <Tab.Panel className={classNames('rounded-xl p-3')}>
                  <NewAlertForm telegram={telegram} alertType={categoryTabs[index]} gpu_models={gpu_models} />
                </Tab.Panel  >
              ))}


            </Tab.Panels>
          </ProfileLayout>
        </Tab.Group>
      </section>
    </section>
  );
}
