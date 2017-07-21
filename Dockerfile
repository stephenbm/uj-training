FROM dorker.standardbank.co.za/cenchop:7.3
RUN pip install flask eventlet requests
RUN yum install nginx siege -y
CMD /bin/bash
