package trivia;

import java.io.*;
import java.util.Base64;

import trivia.models.User;

public class BasicAuth {

	public static Boolean authorize(String headerAuth) {
		final String[] creds = getCredentials(headerAuth);
		System.out.println("Autorized: "+creds[0]);
		return User.findFirst("username = ? AND password = ?", creds[0], creds[1]) != null;
	}
	
	//Unused
	static User getUser(String headerAuth) {
		final String[] creds = getCredentials(headerAuth);
		return User.findFirst("username = ?", creds[0]);
	}

	private static String[] getCredentials(String headerAuth) {
		try {
			String base64Credentials = headerAuth.substring("Basic".length()).trim();
			byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
			String credentials = new String(credDecoded, "UTF-8");

			return credentials.split(":", 2);

		} catch (UnsupportedEncodingException e) {
			throw new AssertionError("UTF-8 is unknown");
		}
	}
}
