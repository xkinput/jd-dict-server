import { readdir, stat, lstat } from 'fs/promises'

interface ReadFilesOuput {
  name: string
  size: number
  path: string
  ctime: Date
  mtime: Date
}
export async function readFiles(dir: string): Promise<ReadFilesOuput[]> {
  let files: ReadFilesOuput[] = []

  for (let filepath of await readdir(dir)) {
    if (filepath.indexOf('.') !== 0) {
      let childpath = `${dir}/${filepath}`
      let statPath = await stat(childpath)

      if (statPath.isDirectory()) {
        files = files.concat(await readFiles(childpath))
      } else {
        files.push({
          name: filepath,
          size: statPath.size,
          path: childpath,
          ctime: statPath.ctime,
          mtime: statPath.mtime,
        })
      }
    }
  }
  return files
}
