package app.controller;

import app.api.App;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by a508708 on 28/01/2017.
 */
@RestController
public class DemeysController {
    @RequestMapping(method = RequestMethod.GET, value = "/api")
    public App app() {
        return new App("<%= projectName %>");
    }
}
