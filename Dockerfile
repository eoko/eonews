FROM ubuntu:12.04

EXPOSE 3000

#RUN
RUN apt-get update \
#  && apt-get install software-properties-common --yes \ # add-apt-repository command (for 14.04)
  && apt-get install python-software-properties --yes \ # add-apt-repository command (for 12.04)
  # android sdk
  && add-apt-repository ppa:upubuntu-com/devel --yes \
  && apt-get update \
  && apt-get install android-sdk --yes \
  # java
  && apt-get install --yes openjdk-7-jdk \
  # meteor
  && apt-get install curl --yes \
  && curl https://install.meteor.com/ | sh

WORKDIR /app

CMD ["meteor"]
