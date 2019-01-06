showLinks = type => {
  let list = [];

  if (this.props.user.userData) {
    type.forEach(item => {
      if (!this.props.user.userData.isAuth) {
        if (item.public === true) {
          list.push(item);
        }
      } else {
        if (item.name !== "Log in") {
          list.push(item);
        }
      }
    });
  }

  return list.map((item, i) => {
    if (item.name !== "My Cart") {
      return this.defaultLink(item, i);
    } else {
      return this.cartLink(item, i);
    }
  });
};
