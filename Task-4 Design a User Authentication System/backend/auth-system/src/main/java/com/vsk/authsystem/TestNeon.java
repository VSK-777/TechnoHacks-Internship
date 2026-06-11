package com.vsk.authsystem;

import java.sql.Connection;
import java.sql.DriverManager;

public class TestNeon {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://ep-aged-sound-aonv3kdl-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
        String user = "neondb_owner";
        String password = "npg_b6YPrmeAqV5F";
        try {
            System.out.println("Attempting connection with:");
            System.out.println("URL: " + url);
            System.out.println("User: " + user);
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connected successfully!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
