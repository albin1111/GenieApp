import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeybView({ children, ...props }) {
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...props}
    >
      <ScrollView
        style={{ flex: 1 }}
        className="flex-1"
        // bounces={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
      >
        {
          children
        }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}