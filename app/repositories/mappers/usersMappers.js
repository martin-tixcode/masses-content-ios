export function userMapper(user) {
  return {
    id: user?.id,
    roleId: user?.role_id,
    paymentMethodId: user?.payment_method_id,
    profession: {
      id: user?.profession_id,
      name: user?.profession_id
    },
    audiovisualResource: {
      id: user?.audiovisual_resource_id,
      name: user?.audiovisual_resource_id
    },
    studyLevelId: user?.study_level_id,
    genreId: user?.genre_id,
    name: user?.name,
    lastName: user?.last_name,
    phone: user?.phone,
    dateBirth: user?.date_birth,
    country: user?.country,
    hasCar: user?.has_car,
    hasKids: user?.has_kids,
    familyMembers: user?.family_members,
    facebookId: user?.facebook,
    instagram: user?.instagram,
    twitter: user?.twitter,
    email: user?.email,
    emailIerifiedAt: user?.email_verified_at,
    avatar: user?.avatar,
    active: user?.active,
    createdAt: user?.created_at,
    updatedAt: user?.updated_at,
    image: user?.image_url

  };
}

export function usersMapper(users) {
  const usersArray = [];
  users.forEach(user => {
    usersArray.push(userMapper(user));
  });
  return usersArray;
}

function profileMapper(profile) {
  return {
    id: profile.id,
    name: profile.name,
  };
}

export function profilesMapper(profiles) {
  const profilesArray = [];
  profiles.forEach(profile => {
    profilesArray.push(profileMapper(profile));
  });
  return profilesArray;
}
