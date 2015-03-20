<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{% block title %}Frontend Toolkit{% endblock %}</title>

        <link rel="stylesheet" href="/assets/css/screen.css"/>

    </head>

    <body>

        {% block content %}
        {% endblock %}

        <script src="/assets/js/jquery.js"></script>
        <script src="/assets/js/global.js"></script>

    </body>

</html>
