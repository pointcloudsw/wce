#!/bin/bash
rsrcdir=$1 # Relative path to root of source directory
tgtdir=$2 # Absolute path to root of target directory
xmlfile=$3 # xml file

export PATH="/bin:/usr/bin:/usr/local/bin"

typeset -A flist
flist=$(find ${rsrcdir} -type f \( -name '*.md' -o -name '*.mdx' \) -print)

echo "<list>" > ${xmlfile}

for f in $flist; do
    pstr=$(dirname ${f})  # relative path to source directory
    bstr=$(basename ${f}) # source filename
    path="${tgtdir}/${pstr}"  # absolute path to target directory
    tgtfn="${path}/${bstr}" # absolute path to target file

    [[ ! -d ${path} ]] && echo "Creating directory "${path} && mkdir -p ${path}
    cp "${f}" "${tgtfn}"

    echo "Modifying "${tgtfn}
    sed -ie '1i\
<doc>' "${tgtfn}"
    sed -ie '$a\
</doc>' "${tgtfn}"


    echo "Writing ${bstr} to ${xmlfile}..."
    echo "<MarkdownDocument><path>${f}</path>"$(cat ${tgtfn})"</MarkdownDocument>" >> ${xmlfile}
    # cat "${tgtfn}" >> ${xmlfile}
    # echo "</doc></MarkdownDocument>" >> ${xmlfile}

    
done

echo "</list>" >> ${xmlfile}

echo "Complete."

