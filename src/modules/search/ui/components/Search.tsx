import { TextInput, View, Pressable, ActivityIndicator } from "react-native"
import { useSearchStore } from "../../store/search.store"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from 'expo-blur'
import { useThemeColor } from "@/shared/hooks/useThemeColor"
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withSpring,
    withSequence,
    withTiming 
} from "react-native-reanimated"
import * as Haptics from 'expo-haptics'
import { LinearGradient } from "expo-linear-gradient"

import { useCallback, useEffect, useState } from "react"
import debounce from 'lodash/debounce'
import { usePhotos } from "@/modules/photo/hooks/usePhotos"

export const Search = () => {
    const { query, setQuery } = useSearchStore()
    const textColor = useThemeColor({}, 'text')
    const backgroundColor = useThemeColor({}, 'searchBackground')
    const borderColor = useThemeColor({}, 'searchBorder')

    // Локальное состояние для отслеживания загрузки
    const {isSearching, setIsSearching} = useSearchStore()

    const { refetch } = usePhotos()

    const scale = useSharedValue(1)
    const iconRotation = useSharedValue('0deg')

    const debouncedSearch = useCallback(
        debounce(async (text: string) => {
            try {
                setIsSearching(true)
                setQuery(text)
                await refetch()
            } finally {
                setIsSearching(false)
            }
        }, 150),
        []
    )

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [])

    const handleSearch = (text: string) => {
        setQuery(text) // Обновляем значение инпута немедленно
        debouncedSearch(text) // Запускаем поиск с задержкой
    }

    const handleClear = () => {
        setQuery('')
        debouncedSearch('')
    }

    const handleFocus = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        scale.value = withSpring(1.02)
        iconRotation.value = withSequence(
            withTiming('-15deg', { duration: 150 }),
            withTiming('15deg', { duration: 150 }),
            withTiming('0deg', { duration: 150 })
        )
    }

    const handleBlur = () => {
        scale.value = withSpring(1)
    }

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: iconRotation.value }]
    }))

    return (
        <Animated.View 
            style={[animatedStyle]} 
            className="w-full px-4 py-2"
        >
            <BlurView intensity={20} tint="light" className="overflow-hidden rounded-xl">
                <LinearGradient
                    colors={['#11326C', '#2563eb', '#11326C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-row items-center bg-white/10 backdrop-blur-lg"
                >
                    <Animated.View style={[iconStyle]} className="pl-4">
                        {isSearching ? (
                            <ActivityIndicator size="small" color={textColor} />
                        ) : (
                            <Ionicons 
                                name="search-outline" 
                                size={24} 
                                color={textColor} 
                            />
                        )}
                    </Animated.View>
                    <TextInput
                        className="flex-1 p-3 px-4"
                        placeholder="Search amazing photos..."
                        placeholderTextColor={textColor + '80'}
                        onChangeText={handleSearch}
                        value={query}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{ 
                            color: textColor,
                            fontSize: 16
                        }}
                    />
                    {query.length > 0 && (
                        <Pressable 
                            onPress={handleClear}
                            className="pr-4"
                        >
                            <Ionicons 
                                name="close-circle" 
                                size={20} 
                                color={textColor + '80'} 
                            />
                        </Pressable>
                    )}
                </LinearGradient>
            </BlurView>
        </Animated.View>
    )
}