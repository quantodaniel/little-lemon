import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

type AvatarProps = {
  profile?: any;
  header?: boolean;
};

export const Avatar = ({ profile, header }: AvatarProps) => {
  if (profile?.image) {
    return (
      <Image
        source={{ uri: profile.image }}
        style={[styles.avatarImage, header ? styles.avatarHeader : {}]}
      />
    );
  } else {
    return (
      <View style={[styles.avatarEmpty, header ? styles.avatarHeader : {}]}>
        <Text
          style={[
            styles.avatarEmptyText,
            header ? styles.avatarHeaderText : {},
          ]}
        >
          {profile?.firstName && Array.from(profile.firstName)[0]}
          {profile?.lastName && Array.from(profile.lastName)[0]}
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarHeader: {
    width: 50,
    height: 50,
  },
  avatarEmpty: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmptyText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  avatarHeaderText: {
    fontSize: 18,
  },
});
