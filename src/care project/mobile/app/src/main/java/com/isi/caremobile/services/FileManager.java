package com.isi.caremobile.services;
import android.content.Context;
import android.os.Environment;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
public class FileManager {

    public static final String filesPath = "/data/data/com.isi.caremobile/database"; // https://care-project.herokuapp.com/user";
    //
    public static void writeFile(Context context, String fileName, String fileData){
        try{
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput(fileName, Context.MODE_PRIVATE));
            outputStreamWriter.write(fileData);
            outputStreamWriter.close();
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    public static String readFile(String fileName){
        /**
         String fileData = "";
         try{
         FileInputStream fileInputStream = new FileInputStream(fileName);
         DataInputStream dataInputStream = new DataInputStream(fileInputStream);
         BufferedReader bufferedReader =new BufferedReader(new InputStreamReader(dataInputStream));
         String strLine;
         while ((strLine = bufferedReader.readLine()) != null) {
         fileData +=  strLine;
         }
         dataInputStream.close();
         }
         catch(IOException e){
         e.printStackTrace();
         }
         return fileData;
         **/
        String filecontent = "" ;
        try{
            File file;
            file = new File(filesPath ,fileName);
            BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(new FileInputStream(file) ));
            filecontent = bufferedReader.readLine();
            bufferedReader.close();
        }
        catch(IOException e){
            e.printStackTrace();
        }
        return filecontent;
    }


}