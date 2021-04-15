export function interestMapper(interest) {
    return {
      id: interest?.id,
      name: interest?.name,
      imagen: interest?.image_url,
      check: false
      
      
    };
  }
  
  export function interestsMappers(interests) {
    const interestsArray = [];
    interests.forEach(interest => {
        interestsArray.push(interestMapper(interest));
    });
    return interestsArray;
  }
  
  
  
  
  