import React from 'react';
import { Text, TextProps } from 'react-native';
import AppColors from "../constants/colors";

type FontWeightType = 'Regular' | 'Bold' | 'Medium' | 'SemiBold' | 'ExtraBold';

interface CustomTextProps extends TextProps {
    fontWeight?: FontWeightType;
    fontSize?: number;
    fontColor?: string;
    children: React.ReactNode;
}

export default function CustomText({
                                       fontWeight = 'Regular',
                                       fontSize = 14,
                                       fontColor = AppColors.textColor,
                                       style,
                                       children,
                                       ...rest
                                   }: CustomTextProps) {
    // Map font weight to specific DMSans font files
    const getFontFamily = (weight: FontWeightType) => {
        const fontMap = {
            'Regular': 'DMSans-Regular',
            'Bold': 'DMSans-Bold',
            'Medium': 'DMSans-Medium',
            'SemiBold': 'DMSans-SemiBold',
            'ExtraBold': 'DMSans-ExtraBold',
        };
        return fontMap[weight];
    };

    return (
        <Text
            style={[
                {
                    fontSize,
                    color: fontColor,
                    fontFamily: getFontFamily(fontWeight),
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
}
