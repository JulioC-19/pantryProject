import React from 'react';
import {colors} from '../styles/colors';
import Icon from '../styles/icons';

export const SearchBarIcon = () => {
  return <Icon.Ionicons name="md-search" color={colors.white} size={26} />;
};

export const FavoriteBarIcon = () => {
  return <Icon.MaterialIcons name="favorite" color={colors.white} size={26} />;
};

export const HomeBarIcon = () => {
  return (
    <Icon.MaterialCommunityIcons name="home" color={colors.white} size={28} />
  );
};
