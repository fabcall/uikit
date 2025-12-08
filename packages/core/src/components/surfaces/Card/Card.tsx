import React, { forwardRef } from "react";
import { View, type View as ViewType } from "react-native";

import type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "./Card.props";
import { styles } from "./Card.styles";

const CardRoot = forwardRef<ViewType, CardProps>(
  ({ variant = "elevated", children, ...props }, ref) => {
    styles.useVariants({
      variant,
    });

    return (
      <View ref={ref} style={styles.container} {...props}>
        {children}
      </View>
    );
  }
);

CardRoot.displayName = "Card";

const CardHeader = forwardRef<ViewType, CardHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.header} {...props}>
        {children}
      </View>
    );
  }
);

CardHeader.displayName = "Card.Header";

const CardContent = forwardRef<ViewType, CardContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.content} {...props}>
        {children}
      </View>
    );
  }
);

CardContent.displayName = "Card.Content";

const CardFooter = forwardRef<ViewType, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.footer} {...props}>
        {children}
      </View>
    );
  }
);

CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
