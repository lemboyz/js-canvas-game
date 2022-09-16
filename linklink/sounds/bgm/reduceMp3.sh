filename="$1"

if [ "$filename" == "" ]; then
    echo "usage: $0 filename.mp3"
    exit 1
fi


for filename in $*; do
    afterfile="`echo -n $filename | sed 's/\.mp3$//g'`_small.mp3"
    ffmpeg -i $filename -b:a 128k -acodec mp3 -ar 22050 -ac 1 $afterfile
done
