export function roleMap(roles: string[]) {
  return roles.map(role => {
    switch (role) {
      case 'http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor':
      case 'Instructor':
        return 'instructor';
      default:
        return 'student';
    }
  });
}
