exports.ArrayOfStringToJSON = async (arr)=>{
  let result = await arr.map((element)=>{
    return JSON.parse(element);
  })
  return result;

}