package com.demeys.api;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by a508708 on 16/01/2017.
 */
public class DemeysService {


    public static String toJSON(Object object)
    {
        if ( object == null ){
            return "{}";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(object);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return "{}";
    }
}
