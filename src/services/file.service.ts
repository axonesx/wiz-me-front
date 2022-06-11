const filesToFormData = (files: File[] | File): FormData => {
    const fd = new FormData()
    if(Array.isArray(files)){
        files.map((file: File, index: number) => {
            fd.append(index.toString(), file)
        })
    } else {
        fd.append('file', files)
    }
    return fd
}

export {
    filesToFormData,
}