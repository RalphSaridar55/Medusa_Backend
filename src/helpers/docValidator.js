export function docValidator(doc) {
    let ext
    if(!doc)
        return true
    else{
    ext = doc.split(".");
    console.log(ext[ext.length - 1]);
    }
    if (doc.length<1) return true
    else if (ext[ext.length - 1] != "docx" && ext[ext.length - 1] != "pdf")
        return true
    return ''
  }
  
  