package com.vskconnect.util;

public class AvatarUtil {

    private static final String UI_AVATARS_URL = "https://ui-avatars.com/api/?name=";

    public static String generateAvatar(String name) {
        if (name == null || name.trim().isEmpty()) {
            return UI_AVATARS_URL + "User&background=random";
        }
        // Replace spaces with + for URL encoding
        String formattedName = name.trim().replaceAll("\\s+", "+");
        return UI_AVATARS_URL + formattedName + "&background=random&color=fff";
    }
}
