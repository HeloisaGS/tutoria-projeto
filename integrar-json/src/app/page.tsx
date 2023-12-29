import Image from 'next/image'
import styles from './page.module.css'
import Teste from '@/services/api'
export default function Home() {
  return (
    <main>
      <Teste/>
    </main>
  )
}
