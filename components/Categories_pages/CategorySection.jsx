import Page404 from '../Page404'
import CategoryPageChassis from './CategoryPageChassis'
import CategoryPageCPU from './CategoryPageCPU'
import CategoryPageCPUCooler from './CategoryPageCPUCooler'
import CategoryPageGPU from './CategoryPageGPU'
import CategoryPageMB from './CategoryPageMB'
import CategoryPagePSU from './CategoryPagePSU'
import CategoryPageRAM from './CategoryPageRAM'
import CategoryPageStorage from './CategoryPageStorage'
import CategoryPageMonitor from './CategoryPageMonitor'

export default function CategorySection({ category, data }) {
  if (!data) return <> </>
  if (Object.keys(data).length <= 1) return <> </>

  switch (category) {
    case 'monitores':
      return (
        <section>
          <CategoryPageMonitor data_recv={data} />
        </section>
      )
    case 'placas-base':
      return (
        <section>
          <CategoryPageMB data_recv={data} />
        </section>
      )
    case 'tarjetas-graficas':
      return (
        <section>
          <CategoryPageGPU data_recv={data} />
        </section>
      )
    case 'fuentes-alimentacion':
      return (
        <section>
          <CategoryPagePSU data_recv={data} />
        </section>
      )
    case 'memoria-ram':
      return (
        <section>
          <CategoryPageRAM data_recv={data} />
        </section>
      )
    case 'procesadores':
      return (
        <section>
          <CategoryPageCPU data_recv={data} />
        </section>
      )
    case 'almacenamiento':
      return (
        <section>
          <CategoryPageStorage data_recv={data} />
        </section>
      )
    case 'torres':
      return (
        <section>
          <CategoryPageChassis data_recv={data} />
        </section>
      )
    case 'disipadores-cpu':
      return (
        <section>
          <CategoryPageCPUCooler data_recv={data} />
        </section>
      )

    default:
      return <Page404 />
  }
}
