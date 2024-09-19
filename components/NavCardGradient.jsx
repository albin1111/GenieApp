import { View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router'

import icons from '../constants/icons'

const NavCardGradient = ({
  titleName,
  addStyles,
  imageSource,
  imagePosition,
  imageRotation,
  gradientValueStart,
  gradientValueEnd,
  gradientColorStart,
  gradientColorEnd,
  href,
}) => {
  // const imgSrc = imageSource;
  return (
    <LinearGradient
      // max-h-[200] min-h-[100] max-w-[200] min-w-[100]
      className={`flex-1 rounded-2xl relative overflow-hidden ${addStyles}`}
      start={{ x: gradientValueStart, y: 0.5 }}
      end={{ x: gradientValueEnd, y: 0.5 }}
      colors={[gradientColorStart, gradientColorEnd]}
    >
      <Text className="absolute z-[1] w-full text-center text-white text-base top-5 font-mRegular">{titleName}</Text>

      {/* -left-5 -bottom-5 */}
      <Image className={`absolute w-40 h-40 ${imageRotation} ${imagePosition}`} source={icons[imageSource]}></Image>
      <Image className="absolute w-7 h-7 bottom-4 right-4" source={icons.arrowRight}></Image>

      <Link href={href} className='w-full h-full text-center rounded-3xl z-[2]'></Link>

    </LinearGradient>
  )
}

export default NavCardGradient;