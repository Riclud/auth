import { Injectable } from '@nestjs/common'
import fs from 'fs'


@Injectable()
export class CacheService {
  private folderName = 'db'
  private shutdownFCList: { name: string, fc: Function }[] = []

  constructor() {
    const coreFolder = fs.readdirSync('.')
    if (!coreFolder.includes(this.folderName)) {
      fs.mkdirSync(this.folderName)
    }
    process.on('SIGINT', () => {
      this.shutdownFCList.forEach(el => {
        const filePath = `${this.folderName}/${el.name}.json`
        fs.writeFileSync(filePath, JSON.stringify(el.fc()))
      })

      process.exit(0)
    })
  }

  get(name: string) {
    const filePath = `${this.folderName}/${name}.json`

    if (!fs.existsSync(filePath)) {
      return null
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }

  onShutdown(name: string, fc: Function) {
    this.shutdownFCList.push({ name, fc })
  }




}
