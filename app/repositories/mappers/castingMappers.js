export function castingMapper(casting) {
  return {
    id: casting?.id,
    title: casting?.title,
    image: casting?.image_url,
    description: casting?.description,
    price_min: casting?.price_min,
    price_max: casting?.price_max,
    age_min: casting?.age_min,
    age_max: casting?.age_max,
    has_car: casting?.has_car,
    has_kids: casting?.has_kids,
    family_members: casting?.has_kids,
    casting_agreement: casting?.casting_agreement,
    payment_agreement: casting?.payment_agreement,
    start_date: casting?.start_date,
    endDate: casting?.end_date,
    created_at: casting?.created_at,
    updated_at: casting?.updated_at,
    requirements: casting?.requirements?.map(castRec => {
      return {
        id: castRec?.id,
        name: castRec?.name,
        created_at: castRec?.created_at,
        updated_at:  castRec?.updated_at,
      }
    }),
  };
}

export function castingsMapper(castings) {
  const castingsArray = [];
  castings.forEach(casting => {
    castingsArray.push(castingMapper(casting));
  });
  return castingsArray;
}




