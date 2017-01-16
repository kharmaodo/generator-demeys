package com.demeys.api;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by a508708 on 16/01/2017.
 */
@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DemeysResource {

    @GET
    @Path("/applicationName")
    public Response getAppName(){

        String appname = "demey's application";
        return Response.ok().entity(toJSON(appname)).build();
    }

    //TODO a déplacer
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
